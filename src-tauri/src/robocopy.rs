use shared_child::SharedChild;
use std::collections::HashMap;
use std::process::{Command, Stdio};
use std::sync::{Arc, Mutex};
use std::{io, thread};
use tauri::{AppHandle, Emitter, State};

#[derive(Default)]
pub struct RobocopyState {
    running_copy_jobs: HashMap<String, Arc<SharedChild>>,
}

pub fn is_available() -> bool {
    Command::new("robocopy").arg("/?").output().is_ok()
}

pub fn run_command(source: &str, destination: &str, mode: i32) -> io::Result<SharedChild> {
    let flags = match mode {
        0 => vec!["/E"],
        1 => vec!["/MIR"],
        _ => panic!("Invalid mode"),
    };
    let mut command = Command::new("robocopy");
    command
        .arg(source)
        .arg(destination)
        .args(flags)
        .arg("/R:2")
        .arg("/W:5")
        .stdout(Stdio::null())
        .stderr(Stdio::null());
    SharedChild::spawn(&mut command)
}

#[tauri::command]
pub fn start_copy_job(
    app: AppHandle,
    state_mutex: State<'_, Arc<Mutex<RobocopyState>>>,
    copy_job_id: String,
    copy_job_src_dir_path: String,
    copy_job_dst_dir_path: String,
    copy_job_mode: i32,
) {
    {
        let state = state_mutex.lock().unwrap();
        if state.running_copy_jobs.contains_key(&copy_job_id) {
            return;
        }
    }

    let child_arc = if let Ok(child) = run_command(
        &copy_job_src_dir_path,
        &copy_job_dst_dir_path,
        copy_job_mode,
    ) {
        Arc::new(child)
    } else {
        return;
    };

    {
        let mut state = state_mutex.lock().unwrap();
        state
            .running_copy_jobs
            .insert(copy_job_id.clone(), Arc::clone(&child_arc));
    }

    app.emit("copy-job-started", copy_job_id.clone()).unwrap();

    let thread_state_mutex = Arc::clone(&state_mutex);
    let thread_child_arc = Arc::clone(&child_arc);
    thread::spawn(move || {
        thread_child_arc.wait().unwrap();
        let mut state = thread_state_mutex.lock().unwrap();
        state.running_copy_jobs.remove(&copy_job_id);
        app.emit("copy-job-finished", copy_job_id).unwrap();
    });
}

#[tauri::command]
pub fn stop_copy_job(
    app: AppHandle,
    state_mutex: State<'_, Arc<Mutex<RobocopyState>>>,
    copy_job_id: String,
) {
    let mut state = state_mutex.lock().unwrap();
    if let Some(child) = state.running_copy_jobs.get_mut(&copy_job_id) {
        child.kill().unwrap();
        state.running_copy_jobs.remove(&copy_job_id);
        app.emit("copy-job-finished", copy_job_id).unwrap();
    }
}
