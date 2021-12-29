// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const configuredTime:number = vscode.workspace.getConfiguration().get('conf.drinkWater.time') || 3000000;
if(typeof configuredTime !== 'number'||configuredTime < 1) {
		vscode.window.showErrorMessage('时间必须为数字，不能小于1');
		throw new Error('时间必须为数字，不能小于1');
}
const ONE_MINUTE = 60 * 1000;

let timer:NodeJS.Timeout;

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('drink-water.startDrinking', () => {
		vscode.window.showInformationMessage('开始喝水');
	});

	let disposable2 = vscode.commands.registerCommand('drink-water.stopDrinking', () => {
		timer && clearInterval(timer);
		vscode.window.showInformationMessage('喝水小助手已停止运行');
	});

	const btnText: vscode.MessageItem = {
		title: "知道了",
	};
	timer = setInterval(() => {
		vscode.window.showInformationMessage('喝水小助手提醒您：每天八杯水，健康中国人', btnText);
	},  ONE_MINUTE * configuredTime);

	context.subscriptions.push(disposable2);
	context.subscriptions.push(disposable);
}

export function deactivate() {
	clearInterval(timer as NodeJS.Timeout );
}
