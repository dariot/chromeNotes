var newNote, save, html, i, savedNotes;

$(document).ready(function () {
	var content = $("#content");

	function init() {
		/* DEBUG */
		//localStorage.removeItem("notes");
		//alert(localStorage.getItem("notes"));
		content.empty();
		content.append("<input type='button' id='newButton' value='New note' onclick='newNote()'/><br/>");
		load();
	}

	init();

	newNote = function() {
		html = "";
		content.empty();
		html += "<form id='newNoteForm'>";
		html += "Title: <input type='text' id='title' style='width:200px'/><br/>";
		html += "Text: <textarea rows='5' id='text' style='width:200px'></textarea><br/><br/>";
		html += "<table><tr>";
		html += "<td><input type='button' id='saveButton' value='Save note' onclick='save()'/></td>";
		html += "<td><input type='button' id='backButton' value='Back' onclick='back()'/></td>";
		html += "</tr></table>"
		html += "</form>";
		content.append(html);
	};

	function load() {
		var html = "";
		if (localStorage.getItem("notes") == null || localStorage.getItem("notes") == ""){
			html += "You don't have any notes."
		} else {
			savedNotes = JSON.parse(localStorage.getItem("notes")).notes;
			for (i = 0; i < savedNotes.length; i++) {
				html += "<div class='note'>"
				html += "<img src='edit.png' width='15' height='15' onclick='edit(" + savedNotes[i].id + ")'/>";
				html += "<img src='delete.png' width='15' height='15' onclick='remove(" + savedNotes[i].id + ")'/><br/>";
				html += "<b>" + savedNotes[i].title + "</b><br/>";
				html += savedNotes[i].text + "</div><br/><br/>";
			}
		}
		content.append("<br/>" + html);
		if (localStorage.getItem("notes") != null) {
			content.append("<input type='button' id='removeButton' value='Remove all notes' onclick='removeAll()'/><br/>");
		}
	}

	function maxId() {
		var max = 0;
		if (localStorage.getItem("notes") != null) {
			savedNotes = JSON.parse(localStorage.getItem("notes")).notes;
			for (i = 0; i < savedNotes.length; i++) {
				if (savedNotes[i].id > max) {
					max = savedNotes[i].id;
				}
			}
		}
		return max;
	}

	save = function(noteId) {
		if (noteId == null || noteId === "") {
			var noteId = maxId() + 1;
		}
		var o, toAdd;
		if (localStorage.getItem("notes") == null) {
			o = {
				id: noteId,
				title: $("#title").val(),
				text: $("#text").val()
			};
			toAdd = "{\"notes\": [" + JSON.stringify(o) + "]}";
			localStorage.setItem("notes", toAdd);
		} else {
			toAdd = {
				id: noteId,
				title: $("#title").val(),
				text: $("#text").val()
			};
			if (noteId > maxId()) {
				var notes = localStorage.getItem("notes");
				o = notes.substring(0, notes.length - 2) + ", " + JSON.stringify(toAdd) + "]}";
			} else {
				savedNotes = JSON.parse(localStorage.getItem("notes")).notes;
				savedNotes[noteId - 1] = JSON.stringify(toAdd);
				for (i = 0; i < savedNotes.length; i++) {
					if (i != noteId - 1) {
						savedNotes[i] = JSON.stringify(savedNotes[i]);
					}
				}
				o = "{\"notes\": [" + savedNotes + "]}";
			}
			localStorage.setItem("notes", o);
		}
		init();
	};

	edit = function(noteId) {
		html = "";
		savedNotes = JSON.parse(localStorage.getItem("notes")).notes;
		content.empty();
		html += "<form id='editNoteForm'>";
		html += "Title: <input type='text' id='title' value='" + savedNotes[noteId - 1].title + "' style='width:200px'/><br/>";
		html += "Text: <textarea rows='5' id='text' style='width:200px'>" + savedNotes[noteId - 1].text + "</textarea><br/><br/>";
		html += "<table><tr>";
		html += "<td><input type='button' id='saveButton' value='Save note' onclick='save(" + noteId + ")'/></td>";
		html += "<td><input type='button' id='backButton' value='Back' onclick='back()'/></td>";
		html += "</tr></table>"
		html += "</form>";
		content.append(html);
	};

	remove = function(noteId) {
		if (confirm("Are you sure you want to delete this note?")) {
			savedNotes = JSON.parse(localStorage.getItem("notes")).notes;
			if (savedNotes.length == 1) {
				localStorage.removeItem("notes");
			} else {
				savedNotes.splice(noteId - 1, 1);
				for (i = 0; i < savedNotes.length; i++) {
					if (i >= noteId - 1) {
						savedNotes[i].id = savedNotes[i].id - 1;
					}
					savedNotes[i] = JSON.stringify(savedNotes[i]);
				}
				o = "{\"notes\": [" + savedNotes + "]}";
				localStorage.setItem("notes", o);
			}
			init();
		}
	};

	removeAll = function() {
		if (confirm("Are you sure you want to delete all notes?")) {
			localStorage.removeItem("notes");
			init();
		}
	};

	back = function() {
		init();
	}
});