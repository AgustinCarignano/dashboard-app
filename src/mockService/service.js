export async function getAllData(path) {
  const resp = await fetch(path);
  const data = await resp.json();
  return data;
}

export async function getItemData(path, id) {
  const allData = await getAllData(path);
  const itemData = allData.find((item) => item.id === id);
  return itemData;
}
