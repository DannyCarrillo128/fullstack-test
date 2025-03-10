import type { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react';

import { useForm } from '@/hooks/useForm';

describe('useForm tests.', () => {

  const fields = {
      name: 'John Doe',
      email: 'johndoe@email.com'
    };
  
    test('should return default values.', () => {
      const { result } = renderHook(() => useForm(fields));
  
      expect(result.current).toEqual({
        name: fields.name,
        email: fields.email,
        formState: fields,
        onInputChange: expect.any(Function),
        onReset: expect.any(Function)
      });
    });
  
    test('should change the name field.', () => {
      const newName = 'Richard';
  
      const { result } = renderHook(() => useForm(fields));
      const { onInputChange } = result.current;
  
      act(() => {
        const event = {
          target: {
            name: 'name',
            value: newName
          }
        };
  
        onInputChange(event as ChangeEvent<HTMLInputElement>);
      });
  
      expect(result.current.name).toBe(newName);
      expect(result.current.formState.name).toBe(newName);
    });
  
    test('should reset the form.', () => {
      const newName = 'Richard';
  
      const { result } = renderHook(() => useForm(fields));
      const { onInputChange, onReset } = result.current;
  
      act(() => {
        const event = {
          target: {
            name: 'name',
            value: newName
          }
        };
  
        onInputChange(event as ChangeEvent<HTMLInputElement>);
        onReset();
      });
  
      expect(result.current.name).toBe(fields.name);
      expect(result.current.formState.name).toBe(fields.name);
    });

});
