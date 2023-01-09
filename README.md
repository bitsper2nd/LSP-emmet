# LSP-emmet-ls

Emmet server based on LSP and official emmet library.

Provided through [Emmets](https://github.com/pedro757/emmet).

### Installation

Currently, LSP-emmet-ls is not on Package Control.

1. Install [LSP](https://packagecontrol.io/packages/LSP) via Package Control.
1. Clone LSP-emmet-ls to your `Packages` folder.
    1. Run `sublime.packages_path()` in Sublime Text console. It will show the path of your `Packages` folder.
    1. Open a terminal in the `Packages` folder and then run `git clone git@github.com:bitsper2nd/LSP-emmet-ls.git`
1. Restart Sublime Text.

OR

1. Press Control + Shift + p in Sublime Text to open the command palette.
1. Type Add Repository `https://github.com/bitsper2nd/LSP-emmet-ls.git`
1. Open the command palette again and type install package. Type LSP-marksman and press Enter.


### Configuration

There are some ways to configure the package and the language server.

- From `Preferences > Package Settings > LSP > Servers > LSP-emmet-ls`
- From the command palette `Preferences: LSP-emmet-ls Settings`

### Acknowledgments
- Thank you [Aca](https://github.com/aca/emmet-ls) for making this language server
- Thank you [Jack Cherng](https://github.com/jfcherng) for providing a base for this plugin
