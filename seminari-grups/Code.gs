// Crea un Google Sheet buit i enganxa'n l'ID (entre /d/ i /edit a l'URL).
const SHEET_ID = 'ENGANXA_AQUI_L_ID_DEL_FULL';
const TAB_NAME = 'Assignacions';
const GROUPS = 10;
const CAPACITY = 6;

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Participant')
    .setTitle('Grups del seminari')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function assignParticipant(id, level) {
  if (!/^[a-f0-9-]{36}$/.test(String(id))) throw new Error('Identificador no vàlid.');
  level = Number(level);
  if (!Number.isInteger(level) || level < 1 || level > 5) throw new Error('Tria un nivell de l’1 al 5.');
  if (SHEET_ID.indexOf('ENGANXA_') === 0) throw new Error('El full encara no està configurat.');

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(25000)) throw new Error('Hi ha moltes sol·licituds alhora. Torna-ho a provar.');
  try {
    const book = SpreadsheetApp.openById(SHEET_ID);
    let sheet = book.getSheetByName(TAB_NAME);
    if (!sheet) {
      sheet = book.insertSheet(TAB_NAME);
      sheet.appendRow(['Data', 'Identificador', 'Nivell', 'Grup']);
      sheet.setFrozenRows(1);
    }
    const last = sheet.getLastRow();
    const rows = last > 1 ? sheet.getRange(2, 2, last - 1, 3).getValues() : [];
    const existing = rows.find(row => row[0] === id);
    if (existing) return { group: Number(existing[2]), level: Number(existing[1]), alreadyAssigned: true };
    if (rows.length >= GROUPS * CAPACITY) throw new Error('Els 60 llocs ja estan ocupats. Consulta l’organització.');

    const sizes = Array(GROUPS).fill(0);
    const levelCounts = Array(GROUPS).fill(0);
    for (const row of rows) {
      const g = Number(row[2]) - 1;
      if (g >= 0 && g < GROUPS) {
        sizes[g]++;
        if (Number(row[1]) === level) levelCounts[g]++;
      }
    }
    // Entre els grups amb places, prioritza la mida menor; després, menys
    // participants del mateix nivell. El desempat aleatori evita afavorir el grup 1.
    const candidates = Array.from({length: GROUPS}, (_, i) => i)
      .filter(i => sizes[i] < CAPACITY)
      .map(i => ({i, size: sizes[i], same: levelCounts[i], tie: Math.random()}))
      .sort((a, b) => a.size - b.size || a.same - b.same || a.tie - b.tie);
    const group = candidates[0].i + 1;
    sheet.appendRow([new Date(), id, level, group]);
    SpreadsheetApp.flush();
    return { group, level, alreadyAssigned: false };
  } finally {
    lock.releaseLock();
  }
}
