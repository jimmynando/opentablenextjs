import axios from "axios";
import { useState } from "react";

const useAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time,
  }: {
    slug: string;
    partySize: number;
    day: string;
    time: string;
  }) => {
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`, {
        params: {
          day,
          time,
          partySize,
        },
      });
      setLoading(false);
      setData(response.data);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return { loading, error, data, fetchAvailabilities };
};

export default useAvailability;
