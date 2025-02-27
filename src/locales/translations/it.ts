const it = {
  description: "L'app per scrivere i testi delle tue canzoni",
  pages: {
    login: {
      title: `Accedi a {name}`,
      buttons: {
        google: 'Accedi con Google'
      }
    },
    main: {
      tree: {
        lyrics: 'Testi',
        tags: 'Tags'
      },
      dialogs: {
        add: {
          title: 'Aggiungi nuovo elemento',
          leaf: 'Elemento',
          folder: 'Cartella',
          label: 'Nome',
          submit: 'Aggiungi'
        },
        rename: {
          title: 'Rinomina elemento',
          label: 'Nome',
          submit: 'Rinomina'
        },
        move: {
          title: 'Sposta elemento',
          folder: 'Cartella',
          submit: 'Sposta'
        },
        remove: {
          title: 'Rimuovi elemento',
          description: 'Sei sicuro di voler rimuovere questo elemento e tutto il suo contenuto?',
          submit: 'Rimuovi'
        },
        note: {
          title: 'Aggiungi nota',
          content: 'Contenuto',
          tags: 'Tags',
          submit: 'Aggiungi',
          placeholder: 'Seleziona tags',
          searchPlaceholder: 'Cerca tags',
          emptyMessage: 'Nessun tag trovato'
        }
      },
      dropdown: {
        add: 'Aggiungi',
        remove: 'Rimuovi',
        rename: 'Rinomina',
        move: 'Sposta'
      }
    }
  },
  models: {
    tag: {
      id: 'ID',
      label: 'Nome',
      type: 'Tipo',
      items: 'Elementi',
      unique: 'I tag devono essere univoci'
    },
    lyric: {
      id: 'ID',
      label: 'Nome',
      type: 'Tipo',
      items: 'Elementi'
    },
    note: {
      noteId: 'ID Nota',
      lyricId: 'ID Testo',
      lyricOrder: 'Ordine Testo',
      content: 'Contenuto',
      createdAt: 'Data Creazione',
      tags: 'Tags',
    }
  }
} as const;

export default it;