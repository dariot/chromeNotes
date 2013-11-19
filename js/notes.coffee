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
            for note of notes
                if note.id > maxId
                    maxId = note.id
            maxId + 1

    emptyFields = ->
        $('#title').val('')
        $('#content').val('')

    setListeners = ->
        $('#removeAll').on 'click', ->
            ans = confirm "Are you sure you want to remove all notes?"
            if ans
                clearStorage()

        $('#createNote').on 'click', ->
            $(this).hide()
            $('#storedNotes').empty()
            $('#back').show()
            $('#newNote').show()

        $('#saveNote').on 'click', ->
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
            localStorage['chromeNotes'] = JSON.stringify(ar)
            back()

        $('#back').on 'click', ->
            emptyFields()
            back()

        $('#storedNotes').on 'click', '[id^="edit"]', (data) ->
            console.log $(data.currentTarget).attr "id"

        $('#storedNotes').on 'click', '[id^="delete"]', (data) ->
            console.log $(data.currentTarget).attr "id"

    loadNotes = ->
        if not $.isEmptyObject(localStorage)
            notes = JSON.parse(localStorage['chromeNotes'])
            for idx of notes
                html = '<div id="note' + notes[idx].id + '">'
                html += '<img id="edit' + notes[idx].id + '" src="img/edit.png" />'
                html += '<img id="delete' + notes[idx].id + '" src="img/delete.png" />'
                html += '<b>' + notes[idx].title + '</b>'
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