sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"],
	(Controller, MessageToast, JSONModel) => {
		"use strict";

		return Controller.extend("batch.parser.controller.Main", {
			onInit() {},

			onParsePress() {
				const oTextArea = this.getView().byId("idTextArea");
				const sTextAreaValue = oTextArea.getValue();
				try {
					const sJsonString = this.extractJson(sTextAreaValue);
					const oParsed = JSON.parse(sJsonString);
					// Beautify text
					oTextArea.setValue(JSON.stringify(oParsed, null, 2));

					// Build tree and bind
					const oTreeData = this.jsonToTreeNodes(oParsed);
					const oModel = new JSONModel(oTreeData);
					this.getView().byId("idJsonTree").setModel(oModel);

					// Switch to Tree tab
					this.getView().byId("idIconTabBar").setSelectedKey("tree");
					this.getView().byId("idJsonTree").expandToLevel(99);
				} catch (error) {
					console.error("Parsing failed:", error);
					MessageToast.show("Invalid JSON");
				}
			},

			onClearPress() {
				this.getView().byId("idTextArea").setValue("");
				const oTree = this.getView().byId("idJsonTree");
				oTree.setModel(new sap.ui.model.json.JSONModel({ children: [] }));
			},

			onDisplayTree() {
				const oTextArea = this.getView().byId("idTextArea");
				const sTextAreaValue = oTextArea.getValue();
				try {
					const oParsed = JSON.parse(this.extractJson(sTextAreaValue));

					const oTreeData = this.jsonToTreeNodes(oParsed);

					const oModel = new sap.ui.model.json.JSONModel(oTreeData);
					this.getView().byId("idTree").setModel(oModel);
				} catch (error) {
					console.error("Invalid JSON:", error);
				}
			},

			extractJson(text) {
				const start = text.indexOf("{");
				if (start === -1) throw new Error("No JSON start found");

				let braceCount = 0;
				let end = -1;

				for (let i = start; i < text.length; i++) {
					if (text[i] === "{") braceCount++;
					if (text[i] === "}") braceCount--;

					if (braceCount === 0) {
						end = i;
						break;
					}
				}

				if (end === -1) throw new Error("No complete JSON found");

				return text.slice(start, end + 1);
			},

			jsonToTreeNodes(obj, keyName = "") {
				const node = {
					name: keyName ? keyName : "root",
					children: [],
					type: "",
				};

				if (obj !== null && typeof obj === "object") {
					if (Array.isArray(obj)) {
						node.type = "array";
						obj.forEach((item, index) => {
							node.children.push(this.jsonToTreeNodes(item, `[${index}]`));
						});
					} else {
						node.type = "object";
						Object.keys(obj).forEach((key) => {
							node.children.push(this.jsonToTreeNodes(obj[key], key));
						});
					}
				} else {
					// Leaf node
					node.name = keyName + ": " + obj;
					if (obj === null) node.type = "null";
					else if (typeof obj === "string") node.type = "string";
					else if (typeof obj === "number") node.type = "number";
					else if (typeof obj === "boolean") node.type = "boolean";
					else node.type = "leaf";
				}

				return node;
			},
		});
	},
);
