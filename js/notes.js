// Generated by CoffeeScript 1.6.3
(function() {
  $(document).ready(function() {
    var back, calculateNewId, checkLocalStorage, clearStorage, emptyFields, init, loadNotes, removeNoteById, saveNote, selectedNote, setListeners, showNoteEditor;
    selectedNote = null;
    checkLocalStorage = function() {
      var e;
      try {
        return 'localStorage' in window;
      } catch (_error) {
        e = _error;
        return false;
      }
    };
    clearStorage = function() {
      return localStorage.clear();
    };
    back = function() {
      $('#back').hide();
      $('#noteEditor').hide();
      $('#removeAll').show();
      $('#createNote').show();
      $('#storedNotes').show();
      return loadNotes();
    };
    calculateNewId = function() {
      var i, maxId, notes;
      if (!$.isEmptyObject(localStorage)) {
        notes = JSON.parse(localStorage['chromeNotes']);
        maxId = 0;
        for (i in notes) {
          if (notes[i].id > maxId) {
            maxId = notes[i].id;
          }
        }
        return maxId + 1;
      }
    };
    emptyFields = function() {
      $('#title').val('');
      return $('#content').val('');
    };
    removeNoteById = function(id) {
      var i, notes;
      if (!$.isEmptyObject(localStorage)) {
        notes = JSON.parse(localStorage['chromeNotes']);
        for (i in notes) {
          if (notes[i].id = id) {
            notes.splice(i, 1);
            $('#note' + id).remove();
            break;
          }
        }
        console.log(JSON.stringify(notes));
        return localStorage['chromeNotes'] = JSON.stringify(notes);
      }
    };
    saveNote = function() {
      var ar, i, newId, newNote, notes;
      if (selectedNote === null) {
        if (!$.isEmptyObject(localStorage)) {
          notes = JSON.parse(localStorage['chromeNotes']);
        } else {
          notes = [];
        }
        if (notes.length > 0) {
          newId = calculateNewId();
          newNote = {
            "id": newId,
            "title": $('#title').val().trim(),
            "content": $('#content').val().trim()
          };
          notes.push(newNote);
          ar = notes;
        } else {
          localStorage['chromeNotes'] = '';
          newNote = {
            "id": 0,
            "title": $('#title').val().trim(),
            "content": $('#content').val().trim()
          };
          ar = [newNote];
        }
        console.log(JSON.stringify(ar));
        return localStorage['chromeNotes'] = JSON.stringify(ar);
      } else {
        if (!$.isEmptyObject(localStorage)) {
          notes = JSON.parse(localStorage['chromeNotes']);
          for (i in notes) {
            if (notes[i].id = selectedNote.id) {
              notes[i].title = $('#title').val().trim();
              notes[i].content = $('#content').val().trim();
            }
          }
          return localStorage['chromeNotes'] = JSON.stringify(notes);
        }
      }
    };
    showNoteEditor = function() {
      $('#storedNotes').hide();
      $('#removeAll').hide();
      $('#createNote').hide();
      $('#back').show();
      return $('#noteEditor').show();
    };
    setListeners = function() {
      $('#removeAll').on('click', function() {
        var ans;
        ans = confirm('Are you sure you want to remove all notes?');
        if (ans) {
          clearStorage();
          return $('#storedNotes').empty();
        }
      });
      $('#createNote').on('click', function() {
        return showNoteEditor();
      });
      $('#saveNote').on('click', function() {
        saveNote();
        selectedNote = null;
        emptyFields();
        return back();
      });
      $('#back').on('click', function() {
        emptyFields();
        return back();
      });
      $('#storedNotes').on('click', '[id^="edit"]', function(data) {
        var i, id, note, notes;
        id = data.srcElement.id.replace('edit', '');
        notes = JSON.parse(localStorage['chromeNotes']);
        for (i in notes) {
          if (notes[i].id = id) {
            note = notes[i];
            break;
          }
        }
        selectedNote = note;
        console.log(id);
        console.log(selectedNote);
        $('#storedNotes').hide();
        $('#noteEditor').show();
        $('#title').val(note.title);
        return $('#content').val(note.content);
      });
      return $('#storedNotes').on('click', '[id^="delete"]', function(data) {
        var id;
        id = data.srcElement.id.replace('delete', '');
        return removeNoteById(id);
      });
    };
    loadNotes = function() {
      var html, i, notes, _results;
      if (!$.isEmptyObject(localStorage)) {
        $('#storedNotes').empty();
        notes = JSON.parse(localStorage['chromeNotes']);
        _results = [];
        for (i in notes) {
          html = '<div id="note' + notes[i].id + '">';
          html += '<img id="edit' + notes[i].id + '" src="img/edit.png" />';
          html += '<img id="delete' + notes[i].id + '" src="img/delete.png" />';
          html += '<b>' + notes[i].title + '</b>';
          html += '</div>';
          _results.push($('#storedNotes').append(html));
        }
        return _results;
      }
    };
    init = function() {
      var storageSupport;
      storageSupport = checkLocalStorage();
      $('#noteEditor').hide();
      $('#back').hide();
      if (storageSupport) {
        setListeners();
        return loadNotes();
      }
    };
    return init();
  });

}).call(this);
