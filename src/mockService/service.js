export async function getAllData(fileName) {
  const resp = await fetch(`${process.env.PUBLIC_URL}/mockData/${fileName}`);
  const data = await resp.json();
  const delayData = await delayFunction(data);
  return delayData;
}

export async function getItemData(fileName, id) {
  const allData = await getAllData(fileName);
  const itemData = allData.find((item) => item.id === id);
  return itemData;
}

export async function delayFunction(info) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(info);
    }, 300);
  });
}
