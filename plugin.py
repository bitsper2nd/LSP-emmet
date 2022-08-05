from LSP.plugin.core.typing import Tuple
from lsp_utils import NpmClientHandler
import os


def plugin_loaded():
    LspEmmet.setup()


def plugin_unloaded():
    LspEmmet.cleanup()

class LspEmmet(NpmClientHandler):
    package_name = __package__
    server_directory = 'language-server'
    server_binary_path = os.path.join(
        server_directory, 'node_modules', 'src', 'server.ts')

@classmethod
def minimum_node_version(cls) -> Tuple[int, int, int]:
   # this should be aligned with VSCode's Nodejs version
       return (14, 0, 0)


