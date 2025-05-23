interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  createdAt: string;
  clicks: number;
}

export const validateUrl = (url: string): boolean => {
  try {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  } catch {
    return false;
  }
};

export const generateShortCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const saveUrl = (url: ShortenedUrl): ShortenedUrl[] => {
  const existingUrls = getUrls();
  
  // Check for duplicate shortCodes
  const duplicateIndex = existingUrls.findIndex(existing => existing.shortCode === url.shortCode);
  
  let updatedUrls: ShortenedUrl[];
  if (duplicateIndex !== -1) {
    // If duplicate exists, replace it
    updatedUrls = [...existingUrls];
    updatedUrls[duplicateIndex] = url;
  } else {
    // Otherwise add as new
    updatedUrls = [url, ...existingUrls];
  }
  
  localStorage.setItem('shortened-urls', JSON.stringify(updatedUrls));
  console.log("Saved URLs:", updatedUrls);
  return updatedUrls;
};

export const getUrls = (): ShortenedUrl[] => {
  try {
    const stored = localStorage.getItem('shortened-urls');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const deleteUrl = (id: string): ShortenedUrl[] => {
  const existingUrls = getUrls();
  const updatedUrls = existingUrls.filter(url => url.id !== id);
  localStorage.setItem('shortened-urls', JSON.stringify(updatedUrls));
  return updatedUrls;
};

export const incrementClicks = (id: string): void => {
  const urls = getUrls();
  const updatedUrls = urls.map(url => 
    url.id === id ? { ...url, clicks: url.clicks + 1 } : url
  );
  localStorage.setItem('shortened-urls', JSON.stringify(updatedUrls));
};

// Test function to create example with ironman-iiits custom alias
export const createExampleWithCustomAlias = (): void => {
  const customAlias = "ironman-iiits";
  const exampleUrl: ShortenedUrl = {
    id: Date.now().toString(),
    originalUrl: "https://example.com/very-long-url-for-ironman",
    shortCode: customAlias,
    customAlias: customAlias,
    createdAt: new Date().toISOString(),
    clicks: 0
  };
  
  saveUrl(exampleUrl);
  console.log(`Example URL created with custom alias: zeta/${customAlias}`);
};
