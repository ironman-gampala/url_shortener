
import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getUrls, incrementClicks } from '@/utils/urlUtils';

const Redirect = () => {
  const { shortCode } = useParams();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!shortCode) {
      setNotFound(true);
      return;
    }

    const urls = getUrls();
    const matchingUrl = urls.find(url => url.shortCode === shortCode);

    if (matchingUrl) {
      // Increment the clicks count
      incrementClicks(matchingUrl.id);
      
      // Set the redirect URL
      setRedirectUrl(matchingUrl.originalUrl);
      console.log(`Redirecting to: ${matchingUrl.originalUrl}`);
    } else {
      console.log(`No URL found for shortCode: ${shortCode}`);
      setNotFound(true);
    }
  }, [shortCode]);

  if (notFound) {
    return <Navigate to="/" />;
  }

  if (redirectUrl) {
    // Perform the actual redirect
    window.location.href = redirectUrl;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Redirecting you...</h1>
          <p className="mb-4">You are being redirected to:</p>
          <div className="bg-white rounded-lg p-4 shadow-md overflow-hidden">
            <a href={redirectUrl} className="text-blue-600 hover:underline break-all">
              {redirectUrl}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Redirect;
