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

    calculateNewId = ->
        #notes = JSON.parse(localStorage['chromeNotes'])

    setListeners = ->
        $('#removeAll').on 'click', ->
            ans = confirm "Are you sure you want to remove all notes?"
            if ans
                clearStorage()

        $('#createNote').on 'click', ->
            $(this).hide()
            $('#back').show()
            $('#newNote').show()
            $('#title').empty()
            $('#content').empty()

        $('#saveNote').on 'click', ->
            notes = JSON.parse(localStorage['chromeNotes'])
            if notes.length > 0
                newId = calculateNewId()
            else
                localStorage['chromeNotes'] = ''
                newNote = 
                    "id": '000'
                    "title": $('#title').val().trim()
                    "content": $('#content').val().trim()
                ar = [newNote]
                localStorage['chromeNotes'] = JSON.stringify(ar)
                back()

        $('#back').on 'click', ->
            back()

    loadNotes = ->
        notes = JSON.parse(localStorage['chromeNotes'])

    init = ->
        storageSupport = checkLocalStorage()
        $('#newNote').hide()
        $('#back').hide()
        if storageSupport
            setListeners()
            loadNotes()

    init()