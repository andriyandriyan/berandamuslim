import clsx from 'clsx';
import {
  FC, memo, ReactNode, useState,
} from 'react';

export interface Tab {
  label: string;
  value: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  return (
    <>
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px font-medium text-center gap-2" role="tablist">
          {tabs.map(tab => (
            <li role="presentation" key={tab.value} className="flex-1 lg:flex-none">
              <button
                className={clsx(
                  'inline-block p-4 border-b-2 rounded-t-lg w-full',
                  selectedTab === tab.value ? 'border-primary-500 text-primary-500' : 'text-gray-500 border-gray-100',
                )}
                type="button"
                role="tab"
                aria-controls={tab.value}
                aria-selected={tab.value === selectedTab ? 'true' : 'false'}
                onClick={() => setSelectedTab(tab.value)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {tabs.map(tab => (
        <div key={tab.value} className={clsx(selectedTab !== tab.value && 'hidden')}>
          {tab.content}
        </div>
      ))}
    </>
  );
};

export default memo(Tabs);
