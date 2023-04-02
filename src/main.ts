import { App, Editor, EditorPosition, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { switchChar } from 'worker';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	charactors: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	charactors: [..."⭐🔶🔷🟢👍"].join("\n")
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('edit', 'Insert / switch characters', (evt: MouseEvent) => {
			const view = this.app.workspace.getActiveViewOfType(MarkdownView);
			if(view){
				this.switchCharactor(view.editor);
			}
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('character-insertion-insert-class');

		this.addCommand({
			id: 'character-insertion-insert',
			name: 'Insert / switch characters',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.switchCharactor(editor);
			}
		});

		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * エディタオブジェクトから文字列を取得し、文字のスイッチを行う
	 * @param editor エディタオブジェクト
	 */
	switchCharactor(editor: Editor){
		const cursor: EditorPosition = editor.getCursor("from");
		const text: string = editor.getLine(cursor.line);
		const check: string = text.slice(cursor.ch);
		editor.setLine(cursor.line, `${text.substring(0,cursor.ch)}${switchChar(check, this.settings.charactors.split("\n"))}`);
		editor.setCursor(cursor);
	}

}

class SettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Setting of input'});

		new Setting(containerEl)
			.setName('Input character')
			.setDesc('Specify the character to be input (one per line)')
			.addTextArea(text => text
				.setValue(this.plugin.settings.charactors)
				.onChange(async (value) => {
					this.plugin.settings.charactors = value;
					await this.plugin.saveSettings();
				}).inputEl.style.height = "6em");
	}
}
