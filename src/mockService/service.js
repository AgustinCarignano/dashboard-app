export async function getAllData(fileName) {
  const resp = await fetch(`${process.env.PUBLIC_URL}/mockData/${fileName}`);
  const data = await resp.json();
  return data;
}

export async function getItemData(fileName, id) {
  const allData = await getAllData(fileName);
  const itemData = allData.find((item) => item.id === id);
  return itemData;
}
