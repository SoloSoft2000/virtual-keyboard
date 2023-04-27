class Row {
  constructor(parentNode) {
    this.parentNode = parentNode;
  }

  createRow = (row, rowName) => {
    const divRow = document.createElement('div');
    divRow.className = rowName;
    const arrEn = row.En;//[].push(...row.En);
    for (let i=0; i<arrEn.length; i++) {
      let newKey = new Key(divRow, row.En[i], row.Ru[i], );
      newKey.createKey(i)
    }
    this.parentNode.append(divRow);
    return ;
  }
}
