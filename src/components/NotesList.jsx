import React from 'react';

const NotesList = ({ notes }) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Saved Notes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Short Name</th>
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Start Date</th>
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Status</th>
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Upcoming Disbursement Amt</th>
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Upcoming Disbursement Date</th>
              <th className="py-3 px-4 text-left text-gray-200 font-semibold text-sm">Current Price</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id} className="border-t border-gray-600">
                <td className="py-3 px-4 text-gray-300">{note.underlyingAsset}</td>
                <td className="py-3 px-4 text-gray-300">{note.issueDate}</td>
                <td className="py-3 px-4 text-gray-300">{/* Placeholder */}</td>
                <td className="py-3 px-4 text-gray-300">{/* Placeholder */}</td>
                <td className="py-3 px-4 text-gray-300">{/* Placeholder */}</td>
                <td className="py-3 px-4 text-gray-300">{/* Placeholder */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotesList;
