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

    setListeners = ->
        $('#removeAll').on 'click', ->
            ans = confirm "Are you sure you want to remove all notes?"
            if ans
                clearStorage()

        $('#createNote').on 'click', ->
            $(this).hide()
            $('#back').show()
            $('#newNote').show()

        $('#title').on 'hide', ->
            $(this).empty()

        $('#content').on 'hide', ->
            $(this).empty()

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
            back()

    loadNotes = ->
        if not $.isEmptyObject(localStorage)
            notes = JSON.parse(localStorage['chromeNotes'])
            console.log notes            

    init = ->
        storageSupport = checkLocalStorage()
        $('#newNote').hide()
        $('#back').hide()
        if storageSupport
            setListeners()
            loadNotes()

    init()