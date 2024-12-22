import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

interface DateInputProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [dateValue, setDateValue] = useState<string>(
    value ? value.toISOString().split('T')[0] : ''
  );

  const handleDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDateValue(e.target.value);
       if (!e.target.value) {
         onChange(null);
            return;
        }

       const dateObj = new Date(`${e.target.value}T00:00:00`);
       if(isNaN(dateObj.getTime())){
           onChange(null)
            return;
         }

        onChange(dateObj);
    },
    [onChange]
  );

  return (
    <Container>
      <StyledDateInput
        type="date"
        value={dateValue}
        onChange={handleDateChange}
      />
    </Container>
  );
};

export default DateInput;

const Container = styled.div`
  display: inline-block; /* Adjust to suit your layout */
`;

const StyledDateInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #00a859;
    box-shadow: 0 0 0 2px rgba(0, 168, 89, 0.2);
  }
`;