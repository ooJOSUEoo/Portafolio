import React, { useEffect, useState } from 'react';
import translate from 'translate'; // Asegúrate de que esta importación sea correcta

interface TranslateContentProps {
  children: string;
  from?: string;
}

export const TC: React.FC<TranslateContentProps> = ({ children, from = 'en' }) => {
  const [result, setResult] = useState<string>('');
  const lang = 'es'; // Idioma al que se va a traducir

  translate.engine = 'google';
  useEffect(() => {
    translate(children, { from, to: lang }).then((res) => {
      setResult(res);
    }).catch((err) => {
      console.error(err);
    });
  }, [children, from, lang]);

  return <>{result}</>;
};

