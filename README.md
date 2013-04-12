nodewar-tools
=============

Command line tools for interacting with nodewar's API

## Usage

All commands are run via the following. 
  
    nodewar-tools [cmd] [options]

Additionally, all commands have a `--help` flag for more details on the command.

#### Commands

The command line tool provides a variety of commands to retrieving and
modifying data through the nodewar's API.

- **auth**: Lets you login and stores a session token. See below.
- **list**: List available species.
- **load**: View a specific species
- **save**: Save code to specific species; first loads the species for the `version`.

#### Authentication

First you'll need to auth and get a session token. Run the auth command
via:

    nodewar-tools auth --user [username]

You will then be prompted for a password. Once you successfully login, the 
session will be saved to `$HOME/.nodewars`. This directory is not yet configurable.
