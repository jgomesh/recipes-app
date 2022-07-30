import { useState } from 'react';

function useBtnFilter() {
  const [btnFilter, setBtnFilter] = useState('All');
  return { btnFilter, setBtnFilter };
}

export default useBtnFilter;
