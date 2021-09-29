const { app, globalShortcut, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		minWidth: 350,
		maxWidth: 350,
		width: 350,
		minHeight: 150,
		maxHeight:150,
		height: 150,
		frame: false,
		resizable: true,
		webPreferences: {
            nodeIntegration: true,
			contextIsolation: false,
        }
	});

	mainWindow.setAlwaysOnTop(true, 'screen');

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'app', 'index.html'));

	// Open the DevTools.
	//mainWindow.webContents.openDevTools();

	mainWindow.webContents.on('did-finish-load', () => {
		// Send the timer value
		//mainWindow.webContents.send('timer-change', timerTime);
	});

	
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
//app.on('ready', createWindow);
app.whenReady().then(() => {
	// Register start/pause keybind
	globalShortcut.register('Shift+CommandOrControl+S', () => {
		mainWindow.webContents.send('timer-play-pause');
	});

	// Register stop keybind
	globalShortcut.register('Shift+CommandOrControl+F', () => {
		mainWindow.webContents.send('timer-stop');
	});
}).then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		globalShortcut.unregisterAll();
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
