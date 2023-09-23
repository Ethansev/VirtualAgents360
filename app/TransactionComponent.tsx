'use client';
import { TransactionSchema, transactions } from '@/sanity/schemas/transactions';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { useEffect } from 'react';

interface TransactionComponentProps {
  transaction: TransactionSchema;
  key: string;
}

// Think I'd rather set the styles outside of the PortableText
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <Image src={value.imageUrl} alt='idk' />,
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <a href={value.url}>{value.text}</a>
      ) : (
        <div className='callToAction'>{value.text}</div>
      ),
    // code: (props) => (
    //   <pre data-language={props.node.language}>
    //     <code>{props.node.code}</code>
    //   </pre>
    // ),
  },
  marks: {
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
  },
  // block: {
  //   h1: ({ children }) => <h1>{children}</h1>,
  //   span: ({ children }) => <span style={{ color: 'red' }}>{children}</span>,
  //   p: ({ children }) => <p style={{ color: 'blue' }}>{children}</p>,
  //   normal: ({ children }) => <p style={{ color: 'green' }}>{children}</p>,
  // },
};

export default function TransactionComponent(props: TransactionComponentProps) {
  const transaction = props.transaction;

  return (
    <div>
      <h1>Title: {transaction.title}</h1>
      <li key={transaction._id}>
        <a>transaction id: {transaction._id}</a>
        <h1>transaction title: {transaction.title}</h1>
        <p>here is portable text</p>
        <br />
        <PortableText value={transaction.body} components={components} />
      </li>
    </div>
  );
}
