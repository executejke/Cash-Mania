let localizationData = {};

export async function loadLocalizationFile() {
  try {
    const response = await fetch(
      `localization.json?timestamp=${new Date().getTime()}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    localizationData = data;
  } catch (error) {
    console.error("Failed to load localization file.", error);
    throw error;
  }
}

export function getLocalizationData() {
  return localizationData;
}
