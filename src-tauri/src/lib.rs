mod robocopy;

use std::path::{Path, PathBuf};
use tauri::{Manager, State};
use tauri_plugin_sql::{Builder, Migration, MigrationKind};

struct RobocopyStatus {
    is_available: bool,
}

fn normalize_path(path: &Path) -> PathBuf {
    path.components().collect()
}

#[tauri::command]
fn validate_path(path: String) -> String {
    if path.is_empty() {
        return "Path cannot be empty".into();
    }

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
        description: "create_copy_action_table",
        sql: include_str!("../migrations/0001_create_copy_action_table.sql"),
        kind: MigrationKind::Up,
    }];

    tauri::Builder::default()
        .setup(|app| {
            app.manage(RobocopyStatus {
                is_available: robocopy::is_available(),
            });
            Ok(())
        })
        .plugin(
            Builder::default()
                .add_migrations("sqlite:database.sqlite", migrations)
                .build(),
        )
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            validate_path,
            are_paths_different,
            is_robocopy_available
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
