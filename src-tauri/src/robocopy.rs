use std::process::Command;

pub fn is_available() -> bool {
    Command::new("robocopy").arg("/?").output().is_ok()
}
