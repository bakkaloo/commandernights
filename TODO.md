# TODO – Commander Nights

## 1. Bug urgente

- [ ] **Tieni premuto sul contavita non si ferma più.** Dopo un long-press la vita continua a scendere/salire di 10 ogni 0,65 s anche a dito staccato (verificato: 40 → 30 al rilascio → -20 dopo 3 s).
  - Causa: `changeLife` → `refreshUnit` ricostruisce l'HTML del pannello; l'elemento con il `setInterval` viene rimosso, il suo `pointerup` non arriva e `clearInterval(rep)` non viene mai eseguito (`index.html`, `bindHold` / `changeLife`).
  - Fix: aggiornare solo il numero della vita e il delta invece di rifare tutto il pannello, oppure tenere i timer fuori dall'elemento (per unità) e fermarli su qualsiasi `pointerup`/`pointercancel` del documento.

## 2. Partita – funzioni mancanti

- [ ] **Annulla ultima modifica**: log delle ultime modifiche (es. "Marco −7, 21:14") con pulsante Annulla.
- [ ] **Turni**: indicatore del giocatore di turno + contatore turni (la classe CSS `.turnclock` esiste già ma non è usata).
- [ ] **Proposta di eliminazione**: quando compare "☠ vita a 0" / "21 da comandante" / veleno letale, chiedere "Eliminare X?" invece di farlo a mano dai dettagli.
- [ ] **Tasto indietro Android**: integrare la navigazione con la History API (`pushState`/`popstate`) così il tasto indietro chiude il foglio aperto o torna alla schermata precedente invece di uscire dall'app.

## 3. Robustezza

- [ ] **Cache immagini senza limite** (`sw.js`): le immagini Scryfall sono risposte opache, Chrome conta circa 7 MB di quota per ognuna → rischio di esaurire lo spazio (incluso il localStorage). Mettere un tetto (es. 200 voci, eliminando le più vecchie) o mettere in cache solo le `art_crop` dei mazzi salvati. Stesso limite per la cache `-api`.
- [ ] **Validare i backup importati**: `p.color`, gli id e gli URL delle immagini finiscono nell'HTML senza escape completo → un backup modificato potrebbe eseguire codice. Validare/normalizzare i campi in `migrate()` (colore = hex, id alfanumerici, URL solo `https://cards.scryfall.io/`).
- [ ] **`sf()` non controlla `r.ok`**: con errori 429 (troppe richieste) o 5xx si vede "Nessuna carta trovata". Distinguere "nessun risultato" (404 di Scryfall) da errore di rete/servizio.

## 4. Esperienza d'uso

- [ ] **Eliminazioni**: sostituire la tripla conferma con una conferma singola + toast "Annulla" di qualche secondo (ripristino da una copia dei dati).
- [ ] **Bracket del mazzo**: in `editDeck` il bracket viene salvato anche senza premere "Salva" (modifica direttamente `d`). Usare una variabile temporanea e applicarla solo al salvataggio.
- [ ] **Link al judge** (`JUDGE_URL`): punta a un progetto Claude privato, gli altri del gruppo non riescono ad aprirlo. Renderlo configurabile nelle impostazioni o spiegare che serve l'accesso.
- [ ] **Zoom**: `user-scalable=no` blocca lo zoom ovunque. Ok sul tavolo da gioco, ma andrebbe permesso su regole e schede delle carte.

## 5. Idee future

- [ ] **Condivisione tra dispositivi**: esportare/importare una partita o un gruppo con QR code o link, oppure sincronizzazione leggera (oggi solo backup manuale).
- [ ] **Statistiche**: scontri diretti tra giocatori, % vittorie per comandante e per colore, andamento nel tempo.
- [ ] **Struttura del codice**: se l'app cresce, separare CSS e JS da `index.html` (93 KB) e aggiungere qualche test per `statsFor`, `layout` e `migrate`.
