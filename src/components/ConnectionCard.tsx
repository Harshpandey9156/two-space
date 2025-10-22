import React from 'react'

interface ConnectionCardProps {
    name: string;
    avatar? : string;
    bio?: string
}

const ConnectionCard: React.FC<ConnectionCardProps> = ({ name, avatar, bio }) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-300 hover:shadow-md transition">
        
        <img
        src={avatar || 'default-avatar.jpg'}
        alt={name}
        className='w-12 h-12 rounded-full object-cover'
        />

        <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        {bio && <p className="text-gray-600 text-sm">{bio}</p>}
      </div>
    </div>
  )
}

export default ConnectionCard
