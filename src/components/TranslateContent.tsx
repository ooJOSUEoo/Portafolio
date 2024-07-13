import { useAppStore } from '@/context/appContext';
import React, { useEffect, useState } from 'react';
import translate from 'translate'; // Asegúrate de que esta importación sea correcta

interface TranslateContentProps {
  children: string;
  from?: string;
}

export const TC: React.FC<TranslateContentProps> = ({ children, from = 'en' }) => {
  const [result, setResult] = useState<string>('');
  const {lang} = useAppStore((s)=>s.ui);

  translate.engine = 'google';
  useEffect(() => {
    translate(children, { from, to: lang }).then((res) => {
      setResult(res);
    }).catch((err) => {
      console.log(err);
    });
  }, [children, from, lang]);

  if (children === children.toUpperCase()) {
    return <>{result.toUpperCase()}</>;
  } else if (children === children.toLowerCase()) {
    return <>{result.toLowerCase()}</>;
  } else if (children[0] === children[0].toUpperCase() && children.slice(1) === children.slice(1).toLowerCase()) {
    return <>{result.slice(0, 1).toUpperCase() + result.slice(1).toLowerCase()}</>;
  } else {
    return <>{result}</>;
  }
};

