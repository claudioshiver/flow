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
        tags: 'Tags',
        dialogs: {
          add: {
            title: 'Aggiungi nuovo elemento',
            leaf: 'Elemento',
            folder: 'Cartella',
            label: 'Nome',
            submit: 'Aggiungi'
          },
          remove: {
            title: 'Rimuovi elemento',
            description: 'Sei sicuro di voler rimuovere questo elemento e tutto il suo contenuto?',
            submit: 'Rimuovi'
          },
          move: {
            title: 'Sposta elemento',
            folder: 'Cartella',
            submit: 'Sposta'
          },
          rename: {
            title: 'Rinomina elemento',
            label: 'Nome',
            submit: 'Rinomina'
          },
        },
      },
      notes: {
        dialogs: {
          add: {
            title: 'Aggiungi nota',
            content: 'Contenuto',
            rate: 'Voto',
            tags: 'Tags',
            submit: 'Aggiungi',
            placeholder: 'Seleziona tags',
            searchPlaceholder: 'Cerca tags',
            emptyMessage: 'Nessun tag trovato'
          },
          remove: {
            title: 'Rimuovi nota',
            description: 'Sei sicuro di voler rimuovere questa nota?',
            submit: 'Rimuovi'
          },
          move: {
            title: 'Sposta elemento',
            lyric: 'Testo',
            empty: 'Nessun testo',
            submit: 'Sposta'
          },
          edit: {
            title: 'Modifica nota',
            content: 'Contenuto',
            rate: 'Voto',
            tags: 'Tags',
            submit: 'Salva',
            placeholder: 'Seleziona tags',
            searchPlaceholder: 'Cerca tags',
            emptyMessage: 'Nessun tag trovato'
          },
        },
      },
      dropdown: {
        add: 'Aggiungi',
        remove: 'Rimuovi',
        rename: 'Rinomina',
        edit: 'Modifica',
        move: 'Sposta',
        moveUp: 'Sposta su',
        moveDown: 'Sposta giù',
        use: 'Usa',
        discard: 'Scarta',
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
      rate: 'Voto',
      tags: 'Tags',
    }
  }
} as const;

export default it;