$(document).ready ->

    checkLocalStorage = ->
        try
            'localStorage' of window
        catch e
            return false

    clearStorage = ->
        localStorage.clear()

    back = ->
        $('#back').hide()
        $('#newNote').hide()
        $('#createNote').show()
        loadNotes()

    calculateNewId = ->
        if not $.isEmptyObject(localStorage)
            notes = JSON.parse(localStorage['chromeNotes'])
            maxId = 0
            for i of notes
                if notes[i].id > maxId
                    maxId = notes[i].id
            maxId + 1

    emptyFields = ->
        $('#title').val ''
        $('#content').val ''

    removeNoteById = (id) ->
        if not $.isEmptyObject(localStorage)
            notes = JSON.parse(localStorage['chromeNotes'])
            for i of notes
                if notes[i].id = id
                    notes.splice i, 1
                    $('#note' + id).remove()
                    break
            console.log JSON.stringify(notes)
            localStorage['chromeNotes'] = JSON.stringify(notes)

    saveNote = (newNote, data) ->
        if newNote
            if not $.isEmptyObject(localStorage)
                notes = JSON.parse(localStorage['chromeNotes'])
            else
                notes = []
            if notes.length > 0
                newId = calculateNewId()
                newNote = 
                    "id": newId
                    "title": $('#title').val().trim()
                    "content": $('#content').val().trim()
                notes.push newNote
                ar = notes
            else
                localStorage['chromeNotes'] = ''
                newNote = 
                    "id": 0
                    "title": $('#title').val().trim()
                    "content": $('#content').val().trim()
                ar = [newNote]
            console.log JSON.stringify(ar)
            localStorage['chromeNotes'] = JSON.stringify(ar)
        else
            if not $.isEmptyObject(localStorage)
                notes = JSON.parse(localStorage['chromeNotes'])
                for i of notes
                    if notes[i].id = data.id
                        notes[i].title = $('#title').val().trim()
                        notes[i].content = $('#content').val().trim()
                localStorage['chromeNotes'] = JSON.stringify(notes)


    setListeners = ->
        $('#removeAll').on 'click', ->
            ans = confirm 'Are you sure you want to remove all notes?'
            if ans
                clearStorage()
                $('#storedNotes').empty()

        $('#createNote').on 'click', ->
            $(this).hide()
            $('#storedNotes').empty()
            $('#back').show()
            $('#newNote').show()

        $('#saveNote').on 'click', ->
            #todo: find out if it's a new note or an existing one
            emptyFields()
            back()

        $('#back').on 'click', ->
            emptyFields()
            back()

        $('#storedNotes').on 'click', '[id^="edit"]', (data) ->
            id = data.srcElement.id.replace 'edit', ''
            notes = JSON.parse(localStorage['chromeNotes'])
            for i of notes
                if notes[i].id = id
                    note = notes[i]
                    break;
            $('#storedNotes').hide()
            $('#newNote').show()
            $('#title').val note.title
            $('#content').val note.content

        $('#storedNotes').on 'click', '[id^="delete"]', (data) ->
            id = data.srcElement.id.replace 'delete', ''
            removeNoteById id

    loadNotes = ->
        if not $.isEmptyObject(localStorage)
            $('#storedNotes').empty()
            notes = JSON.parse(localStorage['chromeNotes'])
            for i of notes
                html = '<div id="note' + notes[i].id + '">'
                html += '<img id="edit' + notes[i].id + '" src="img/edit.png" />'
                html += '<img id="delete' + notes[i].id + '" src="img/delete.png" />'
                html += '<b>' + notes[i].title + '</b>'
                html += '</div>'
                $('#storedNotes').append html

    init = ->
        storageSupport = checkLocalStorage()
        $('#newNote').hide()
        $('#back').hide()
        if storageSupport
            setListeners()
            loadNotes()

    init()