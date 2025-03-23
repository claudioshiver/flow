const en = {
  description: "The app to write the lyrics of your songs",
  pages: {
    login: {
      title: `Login to {name}`,
      buttons: {
        google: 'Login with Google'
      }
    },
    main: {
      tree: {
        lyrics: 'Lyrics',
        tags: 'Tags',
        dialogs: {
          add: {
            title: 'Add new item',
            leaf: 'Item',
            folder: 'Folder',
            label: 'Name',
            submit: 'Add'
          },
          remove: {
            title: 'Remove item',
            description: 'Are you sure you want to remove this item and all its content?',
            submit: 'Remove'
          },
          move: {
            title: 'Move item',
            folder: 'Folder',
            submit: 'Move'
          },
          rename: {
            title: 'Rename item',
            label: 'Name',
            submit: 'Rename'
          },
        },
      },
      notes: {
        dialogs: {
          search: {
            title: 'Search note'
          },
          add: {
            title: 'Add note',
            content: 'Content',
            tags: 'Tags',
            rate: 'Rate',
            submit: 'Add',
            placeholder: 'Select tags',
            searchPlaceholder: 'Search tags',
            emptyMessage: 'No tags found'
          },
          remove: {
            title: 'Remove note',
            description: 'Are you sure you want to remove this note?',
            submit: 'Remove'
          },
          move: {
            title: 'Move item',
            lyric: 'Lyric',
            empty: 'No lyric',
            submit: 'Move'
          },
          edit: {
            title: 'Edit note',
            content: 'Content',
            tags: 'Tags',
            rate: 'Rate',
            submit: 'Save',
            placeholder: 'Select tags',
            searchPlaceholder: 'Search tags',
            emptyMessage: 'No tags found'
          },
        },
      },
      dropdown: {
        add: 'Add',
        remove: 'Remove',
        rename: 'Rename',
        edit: 'Edit',
        move: 'Move',
        moveUp: 'Move up',
        moveDown: 'Move down',
        use: 'Use',
        discard: 'Discard',
      }
    }
  },
  models: {
    tag: {
      id: 'ID',
      label: 'Name',
      type: 'Type',
      items: 'Items',
      unique: 'Tags must be unique'
    },
    lyric: {
      id: 'ID',
      label: 'Name',
      type: 'Type',
      items: 'Items'
    },
    note: {
      noteId: 'Note ID',
      lyricId: 'Lyric ID',
      lyricOrder: 'Lyric Order',
      content: 'Content',
      createdAt: 'Creation Date',
      rate: 'Rate',
      tags: 'Tags',
    }
  }
} as const;

export default en;