# Friendly Copy

A user-friendly Windows app for managing repeatable copy jobs.
Save a copy job once, then run it again with a single click using Windows’ built-in Robocopy tool.
It’s designed to make reliable file copying simple without the need to use the command line.

## Installation

1. Visit the [latest release](https://github.com/MatWojewodzki/friendly-copy/releases/latest)
2. Download the installer
3. (*Optional*) Verify the installer’s integrity by calculating its checksum and comparing it with the value published
in the release:
    
    **PowerShell**
    ```powershell
    Get-FileHash .\path\to\installer.exe
    ```
   
    **cmd**
    ```cmd
    certutil -hashfile installer.exe SHA256
   ```
   
4. Run the installer and proceed with the installation
   
## Contributing

**Found a bug or have an idea?** [Open an issue](https://github.com/MatWojewodzki/friendly-copy/issues/new)
with the details.

## License

[MIT](LICENSE)
