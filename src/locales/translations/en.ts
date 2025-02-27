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
        tags: 'Tags'
      },
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
        }
      },
      dropdown: {
        add: 'Add',
        remove: 'Remove'
      }
    }
  },
  models: {
    tag: {
      id: 'ID',
      label: 'Name',
      type: 'Type',
      items: 'Items'
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
      tags: 'Tags',
    }
  }
} as const;

export default en;