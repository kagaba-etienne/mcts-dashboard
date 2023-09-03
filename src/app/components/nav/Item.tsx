import Link from 'next/link';
import React from 'react';

const Item = ({ url, name, toggleMenu }: { url: string; name: string, toggleMenu: () => void }) => {
  return <Link href={url} onClick={() => toggleMenu()}>{name}</Link>;
};

export default Item;
