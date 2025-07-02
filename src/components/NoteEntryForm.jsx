import React, { useState } from 'react';

const NoteEntryForm = () => {
  const [noteDetails, setNoteDetails] = useState({
    noteName: '',
    underlyingAsset: '',
    investmentAmount: '',
    issueDate: '',
    maturityDate: '',
    couponRate: '',
    couponFrequency: '',
    autocallBarrier: '',
    autocallDates: '', // Simplified for MVP
    downsideBarrier: '',
  });

  const testData = {
    noteName: 'Sample Income Note',
    underlyingAsset: 'SPX',
    investmentAmount: '100000',
    issueDate: '2024-01-15',
    maturityDate: '2029-01-15',
    couponRate: '8.50',
    couponFrequency: 'Quarterly',
    autocallBarrier: '100.00',
    autocallDates: '2025-01-15, 2025-04-15, 2025-07-15, 2025-10-15',
    downsideBarrier: '70.00',
  };

  const handlePopulateTestData = () => {
    setNoteDetails(testData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const [projection, setProjection] = useState(null);

  const calculateProjection = (details) => {
    // MVP: Simulate a basic projection based on entered details
    // In a real scenario, this would involve API calls for live data and complex calculations.
    console.log('Calculating projection for:', details);

    const today = new Date();
    const maturityDate = new Date(details.maturityDate);
    const issueDate = new Date(details.issueDate);

    let projectedIncome = [];
    let currentDate = new Date(issueDate);

    // Simple monthly projection for demonstration
    while (currentDate <= maturityDate) {
      const month = currentDate.toLocaleString('default', { month: 'long' });
      const year = currentDate.getFullYear();
      const estimatedCoupon = (parseFloat(details.investmentAmount) * parseFloat(details.couponRate) / 100) / 12; // Monthly estimate

      projectedIncome.push({
        date: `${month} ${year}`,
        estimatedCoupon: estimatedCoupon.toFixed(2),
        status: 'Expected Coupon',
      });

      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return {
      summary: `Projection for ${details.noteName} (${details.underlyingAsset})`, 
      details: projectedIncome,
      autocallStatus: 'Not yet determined (requires live data)',
      riskStatus: 'Not yet determined (requires live data)',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://mpcdsrza58.execute-api.us-east-1.amazonaws.com/Prod/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Note saved successfully:', result);
      const newProjection = calculateProjection(noteDetails);
      setProjection(newProjection);

    } catch (error) {
      console.error('Error submitting note:', error);
      alert('Failed to save note. Please check the console for details.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">Enter Structured Note Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="noteName" className="block text-gray-300 text-sm font-bold mb-2">Note Name/Identifier</label>
          <input
            type="text"
            id="noteName"
            name="noteName"
            value={noteDetails.noteName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., Dual Directional Note on SPX"
            required
          />
        </div>
        <div>
          <label htmlFor="underlyingAsset" className="block text-gray-300 text-sm font-bold mb-2">Underlying Asset (Ticker)</label>
          <input
            type="text"
            id="underlyingAsset"
            name="underlyingAsset"
            value={noteDetails.underlyingAsset}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., SPX, AAPL"
            required
          />
        </div>
        <div>
          <label htmlFor="investmentAmount" className="block text-gray-300 text-sm font-bold mb-2">Investment Amount ($)</label>
          <input
            type="number"
            id="investmentAmount"
            name="investmentAmount"
            value={noteDetails.investmentAmount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., 10000"
            required
          />
        </div>
        <div>
          <label htmlFor="issueDate" className="block text-gray-300 text-sm font-bold mb-2">Issue Date</label>
          <input
            type="date"
            id="issueDate"
            name="issueDate"
            value={noteDetails.issueDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="maturityDate" className="block text-gray-300 text-sm font-bold mb-2">Maturity Date</label>
          <input
            type="date"
            id="maturityDate"
            name="maturityDate"
            value={noteDetails.maturityDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="couponRate" className="block text-gray-300 text-sm font-bold mb-2">Coupon Rate (%)</label>
          <input
            type="number"
            step="0.01"
            id="couponRate"
            name="couponRate"
            value={noteDetails.couponRate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., 8.00"
            required
          />
        </div>
        <div>
          <label htmlFor="couponFrequency" className="block text-gray-300 text-sm font-bold mb-2">Coupon Frequency</label>
          <select
            id="couponFrequency"
            name="couponFrequency"
            value={noteDetails.couponFrequency}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            required
          >
            <option value="">Select Frequency</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Semi-Annually">Semi-Annually</option>
            <option value="Annually">Annually</option>
          </select>
        </div>
        <div>
          <label htmlFor="autocallBarrier" className="block text-gray-300 text-sm font-bold mb-2">Autocall Barrier (%) of Initial</label>
          <input
            type="number"
            step="0.01"
            id="autocallBarrier"
            name="autocallBarrier"
            value={noteDetails.autocallBarrier}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., 100.00"
            required
          />
        </div>
        <div>
          <label htmlFor="autocallDates" className="block text-gray-300 text-sm font-bold mb-2">Autocall Dates (Comma Separated)</label>
          <input
            type="text"
            id="autocallDates"
            name="autocallDates"
            value={noteDetails.autocallDates}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., 2026-01-15, 2026-04-15"
          />
        </div>
        <div>
          <label htmlFor="downsideBarrier" className="block text-gray-300 text-sm font-bold mb-2">Downside Barrier (%) of Initial</label>
          <input
            type="number"
            step="0.01"
            id="downsideBarrier"
            name="downsideBarrier"
            value={noteDetails.downsideBarrier}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-white"
            placeholder="e.g., 70.00"
            required
          />
        </div>
        <div className="md:col-span-2 flex justify-center space-x-4">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
          >
            Add Note & View Projection
          </button>
          <button
            type="button"
            onClick={handlePopulateTestData}
            className="bg-gray-500 hover:bg-gray-600 text-gray-900 font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors"
          >
            Populate with Test Data
          </button>
        </div>
      </form>

      {/* Placeholder for Projection */}
      <div className="mt-10 p-6 bg-gray-700 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Projected Income & Status</h3>
        <p className="text-gray-300 text-center">
          {noteDetails.noteName ? `Projection for ${noteDetails.noteName} will appear here.` : 'Enter note details above to see projection.'}
        </p>
        {/* More detailed projection will go here */}
        {projection && (
          <div className="mt-6 text-left">
            <h4 className="text-xl font-semibold text-white mb-3">{projection.summary}</h4>
            <p className="text-gray-300 mb-2">Autocall Status: {projection.autocallStatus}</p>
            <p className="text-gray-300 mb-4">Risk Status: {projection.riskStatus}</p>
            <h5 className="text-lg font-semibold text-white mb-2">Projected Monthly Income:</h5>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-gray-700 text-gray-200 text-left text-sm font-semibold">Date</th>
                    <th className="py-2 px-4 bg-gray-700 text-gray-200 text-left text-sm font-semibold">Estimated Coupon</th>
                    <th className="py-2 px-4 bg-gray-700 text-gray-200 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projection.details.map((item, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="py-2 px-4 text-gray-300 text-sm">{item.date}</td>
                      <td className="py-2 px-4 text-gray-300 text-sm">${item.estimatedCoupon}</td>
                      <td className="py-2 px-4 text-gray-300 text-sm">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEntryForm;
