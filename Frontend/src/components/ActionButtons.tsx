import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSyncAlt, faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button className="rounded-button bg-custom text-white px-6 py-3 font-medium">
        <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
        Refresh
      </button>
      <button className="rounded-button border border-custom text-custom px-6 py-3 font-medium">
        <FontAwesomeIcon icon={faHeart} className="mr-2" />
        Favorites
      </button>
      <button className="rounded-button border border-custom text-custom px-6 py-3 font-medium">
        <FontAwesomeIcon icon={faShareAlt} className="mr-2" />
        Share
      </button>
    </div>
  );
};

export default ActionButtons;