const electron = require('electron')
const { app, BrowserWindow, Menu } = require('electron')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  var application_menu =
    [
      {
        label: 'file',

        submenu: [
          {
            label: 'File Open',
            accelerator: 'CmdOrCtrl+o',
            click: () => {
              console.log(electron.dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))

            }
          },

          {
            label: 'Directory Open',
            accelerator: 'CmdOrCtrl+d',
            click: () => {
              console.log(electron.dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] }))
            }
          }
        ]
      }
    ]

  menu = Menu.buildFromTemplate(application_menu)
  Menu.setApplicationMenu(menu)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
