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

    setListeners = ->
        $('#removeAll').on 'click', ->
            clearStorage()
            alert 'Removed all notes.'

        $('#createNote').on 'click', ->
            $(this).hide()
            $('#back').show()
            $('#newNote').show()

        $('#saveNote').on 'click', ->
            notes = localStorage
            console.log localStorage
            if notes is not null and notes is not ''
                #
            else
                localStorage['chromeNotes'] = ''
                newNote = 
                    id: '000'
                    title: $('#title').val().trim()
                    content: $('#content').val().trim()
                localStorage['chromeNotes'] = JSON.stringify(newNote)
                back()

        $('#back').on 'click', ->
            back()

    loadNotes = ->
        notes = window['localStorage'].getItem 'chromeNotes'

    init = ->
        storageSupport = checkLocalStorage()
        $('#newNote').hide()
        $('#back').hide()
        if storageSupport
            setListeners()
            loadNotes()

    init()