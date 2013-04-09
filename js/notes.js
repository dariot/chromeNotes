/*jslint plusplus: true, white: true */
/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */
/*global alert: false, confirm: false, console: false, Debug: false, opera: false, prompt: false, WSH: false, $: false, jQuery: false, localStorage: false */

$(document).ready(function () {
    "use strict";

    var html, savedNotes,
        content = $("#content"),
        IMG_WIDTH = 15,
        IMG_HEIGHT = 15,
        IMG_BASE_PATH = "img",
        EDIT_BTN_PATH = IMG_BASE_PATH + "/edit.png",
        DELETE_BTN_PATH = IMG_BASE_PATH + "/delete.png";

    function load() {
        var i;
        if (!localStorage.notes || localStorage.notes === "") {
            html = "You don't have any notes.";
        } else {
            savedNotes = JSON.parse(localStorage.notes);
            for (i = 0; i < savedNotes.length; i++) {
                html = "<div class='note'>" +
                    "<img id='edit" + i + "' src='" + EDIT_BTN_PATH + "' width='" + IMG_WIDTH + "' height='" + IMG_HEIGHT + "' onclick='edit(" + savedNotes[i].id + ")'/>" +
                    "<img id='delete" + i + "' src='" + DELETE_BTN_PATH + "' width='" + IMG_WIDTH + "' height='" + IMG_HEIGHT + "' onclick='remove(" + savedNotes[i].id + ")'/><br/>" +
                    "<b>" + savedNotes[i].title + "</b><br/>" +
                    savedNotes[i].text + "</div><br/><br/>";
            }
        }
        content.append("<br/>" + html);
        if (localStorage.notes) {
            content.append("<input type='button' id='removeButton' value='Remove all notes'/><br/>");
        }
    }

    function init() {
        html = "<input type='button' id='newButton' value='New note'/><br/>";
        content.html(html);
        console.log(localStorage);
        //localStorage.clear();
        load();
        
        content.on("click", "[id^=edit]", function(ev) {
            console.log(ev);
        });
        $("[id^=delete]").click();
        $("#removeButton").click(removeAll);
        $("#newButton").click(newNote);
        content.on("click", "#saveButton", function() {
            save();
        });
        $("#backButton").click(back);
    }

    function newNote() {
        html = "<form id='newNoteForm'>" +
            "Title: <input type='text' id='title' style='width:200px'/><br/>" +
            "Text: <textarea rows='5' id='text' style='width:200px'></textarea><br/><br/>" +
            "<table><tr>" +
            "<td><input type='button' id='saveButton' value='Save note'/></td>" +
            "<td><input type='button' id='backButton' value='Back'/></td>" +
            "</tr></table>" +
            "</form>";
        content.html(html);
    }

    function maxId() {
        var i,
            max = 0;
        if (localStorage.notes) {
            savedNotes = JSON.parse(localStorage.notes);
            for (i = 0; i < savedNotes.length; i++) {
                if (savedNotes[i].id > max) {
                    max = savedNotes[i].id;
                }
            }
        }
        return max;
    }

    function save(noteId) {
        var i, o, toAdd, notes = [];

        if (!noteId || noteId === "") {
            noteId = maxId() + 1;
        }

        if (!localStorage.notes) {
            notes.push({
                id: noteId,
                title: $("#title").val(),
                text: $("#text").val()
            });
            localStorage.notes = JSON.stringify(notes);
        } else {
            toAdd = {
                id: noteId,
                title: $("#title").val(),
                text: $("#text").val()
            };
            if (noteId > maxId()) {
                notes = localStorage.notes;
                o = notes.substring(0, notes.length - 2) + ", " + JSON.stringify(toAdd) + "]}";
            } else {
                savedNotes = JSON.parse(localStorage.notes);
                savedNotes[noteId - 1] = JSON.stringify(toAdd);
                for (i = 0; i < savedNotes.length; i++) {
                    if ( i !== (noteId - 1) ) {
                        savedNotes[i] = JSON.stringify(savedNotes[i]);
                    }
                }
                o = savedNotes;
            }
            localStorage.notes.push(o);
        }
        init();
    }

    function edit(noteId) {
        savedNotes = JSON.parse(localStorage.notes);
        html = "<form id='editNoteForm'>" +
            "Title: <input type='text' id='title' value='" + savedNotes[noteId - 1].title + "' style='width:200px'/><br/>" +
            "Text: <textarea rows='5' id='text' style='width:200px'>" + savedNotes[noteId - 1].text + "</textarea><br/><br/>" +
            "<table><tr>" +
            "<td><input type='button' id='saveButton' value='Save note' onclick='save(" + noteId + ")'/></td>" +
            "<td><input type='button' id='backButton' value='Back' onclick='back()'/></td>" +
            "</tr></table>" +
            "</form>";
        content.html(html);
    }

    function remove(noteId) {
        var i;
        if (confirm("Are you sure you want to delete this note?")) {
            savedNotes = JSON.parse(localStorage.notes);
            if (savedNotes.length === 1) {
                localStorage.removeItem("notes");
            } else {
                savedNotes.splice(noteId - 1, 1);
                for (i = 0; i < savedNotes.length; i++) {
                    if (i >= noteId - 1) {
                        savedNotes[i].id = savedNotes[i].id - 1;
                    }
                    savedNotes[i] = JSON.stringify(savedNotes[i]);
                }
                localStorage.notes = [savedNotes];
            }
            init();
        }
    }

    function removeAll() {
        if (confirm("Are you sure you want to delete all notes?")) {
            localStorage.removeItem("notes");
            init();
        }
    }

    function back() {
        init();
    }

    init();
});