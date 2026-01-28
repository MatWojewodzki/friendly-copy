mod robocopy;

use crate::robocopy::RobocopyState;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use tauri::{Manager, State};
use tauri_plugin_sql::{Migration, MigrationKind};

struct RobocopyStatus {
    is_available: bool,
}

fn normalize_path(path: &Path) -> PathBuf {
    path.components().collect()
}

#[tauri::command]
fn validate_path(path: String) -> String {
    let path = Path::new(&path);
    if !path.is_absolute() {
        return "Path must be absolute".into();
    }
    String::new()
}

#[tauri::command]
fn are_paths_different(path1: String, path2: String) -> bool {
    let path1 = Path::new(&path1);
    let path2 = Path::new(&path2);

    normalize_path(path1) != normalize_path(path2)
}

#[tauri::command]
fn is_robocopy_available(state: State<'_, RobocopyStatus>) -> bool {
    state.is_available
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![Migration {
        version: 1,
        description: "create_copy_job_table",
        sql: include_str!("../migrations/0001_create_copy_job_table.sql"),
        kind: MigrationKind::Up,
    }];

    let mut builder = tauri::Builder::default();
    #[cfg(desktop)]
    {
        builder = builder.plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            let _ = app
                .get_webview_window("main")
                .expect("no main window")
                .set_focus();
        }));
    }
    builder
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:database.sqlite", migrations)
                .build(),
        )
        .setup(|app| {
            app.manage(RobocopyStatus {
                is_available: robocopy::is_available(),
            });
            app.manage(Arc::new(Mutex::new(RobocopyState::default())));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            validate_path,
            are_paths_different,
            is_robocopy_available,
            robocopy::start_copy_job,
            robocopy::stop_copy_job,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
