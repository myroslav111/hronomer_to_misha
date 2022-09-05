import TextareaAutosize from '@mui/material/TextareaAutosize';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import './Form.css';

function Form() {
  const [value, setValue] = useState('slow');
  const [text, setText] = useState('');
  const [resalt, setResalt] = useState('0 сек.');
  const [words, setWords] = useState(0);
  const [signs, setSigns] = useState(0);

  const handleChange = event => {
    setValue(event.target.value);
  };

  /* функция  подсчета количества слов в строке */
  const countWordsString = string => {
    let counter = 0;
    string = string.replace(/[\s]+/gim, ' ');
    string.replace(/(\s+)/g, function (a) {
      counter++;
    });
    return counter;
  };

  /* функция  перевода цифр в текст */
  const sprop = r => {
    const digits = [
      '',
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
    ];
    const ties = [
      '',
      '',
      'twenty',
      'thirty',
      'forty',
      'fifty',
      'sixty',
      'seventy',
      'eighty',
      'ninety',
    ];
    const illions = [
      '',
      'thousand',
      'million',
      'billion',
      'trillion',
    ].reverse();

    const join = (a, s) => a.filter(v => v).join(s || ' ');

    const tens = s => digits[s] || join([ties[s[0]], digits[s[1]]], '-'); // 21 -> twenty-one

    const hundreds = s =>
      join(
        (s[0] !== '0' ? [digits[s[0]], 'hundred'] : []).concat(
          tens(s.substr(1, 2))
        )
      );

    const re = '^' + '(\\d{3})'.repeat(illions.length) + '$';

    const numberToWords = n =>
      // to filter non number or '', null, undefined, false, NaN
      isNaN(Number(n)) || (!n && n !== 0)
        ? 'not a number'
        : Number(n) === 0
        ? 'zero'
        : Number(n) >= 10 ** (illions.length * 3)
        ? 'too big'
        : String(n)
            .padStart(illions.length * 3, '0')
            .match(new RegExp(re))
            .slice(1, illions.length + 1)
            .reduce(
              (a, v, i) =>
                v === '000' ? a : join([a, hundreds(v), illions[i]]),
              ''
            );
    // console.log(numberToWords('15'));
    return numberToWords(r);
  };

  /* кнопка сброса */
  const reset = () => {
    setText('');
    setSigns(0);
    setWords(0);
    setResalt('0 сек.');
  };

  /* обработка текста по формуле */
  const handleSubmit = n => {
    const myArray = /\D+/gi.exec(n);
    const t = n.replace(myArray, '');
    // console.log(myArray);
    // console.log(t);

    const a = sprop(t);
    const s = a.replace(/\s/gi, '').length;
    // console.log(a);
    // console.log(s);

    const p = countWordsString(a);
    const i = n.replace(/\s/gi, '').length;
    // console.log(p);
    // console.log(i);
    setSigns(i + 1);

    const c = countWordsString(n);
    let I = '';
    // console.log(c);
    setWords(c + 1);
    if (value === 'slow') {
      if (
        parseInt((((i + s) / 14 + (c + p) / 2) / 2) * 1.05) ===
        parseInt((((i + s) / 13 + (c + p) / 2) / 2) * 1.05)
      ) {
        I = parseInt(1.05 * Math.ceil((i + s) / 14));
      } else {
        I =
          parseInt((((i + s) / 14 + (c + p) / 2) / 2) * 1.05) +
          '-' +
          parseInt((((i + s) / 13 + (c + p) / 2) / 2) * 1.05);
      }
      //   console.log(I);
      setResalt(I + ' сек.');
    }

    if (value === 'fast') {
      if (
        parseInt((((i + s) / 14 + (c + p) / 2) / 2) * 0.95) ===
        parseInt((((i + s) / 13 + (c + p) / 2) / 2) * 0.95)
      ) {
        I = parseInt(((i + s) / 14) * 0.95);
      } else {
        I =
          parseInt((((i + s) / 14 + (c + p) / 2) / 2) * 0.95) +
          '-' +
          parseInt((((i + s) / 13 + (c + p) / 2) / 2) * 0.95);
      }
      setResalt(I + ' сек.');
    }

    if (value === 'optimally') {
      if (
        parseInt(((i + s) / 14 + (c + p) / 2) / 2) ===
        parseInt(((i + s) / 13 + (c + p) / 2) / 2)
      ) {
        I = Math.ceil((i + s) / 14);
      } else {
        I =
          parseInt(((i + s) / 14 + (c + p) / 2) / 2) +
          '-' +
          parseInt(((i + s) / 13 + (c + p) / 2) / 2);
      }
      setResalt(I + ' сек.');
    }
  };

  return (
    <div>
      <form
        action="#"
        id="form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '5px',
        }}
      >
        Hello! МИШАНЯ
        <TextareaAutosize
          maxRows={24}
          aria-label="empty textarea"
          placeholder="Вставьте ваш текст"
          style={{ width: '90%' }}
          //   sx={{ width: '90vw', height: 200 }}
          value={text}
          onChange={e => setText(e.target.value)}
          //   sx={{ overflowY: 'scroll' }}
        />
        <div className="help-block" style={{ textAlign: 'center' }}>
          Удалите из текста все лишнее: комментарии, заметки и так далее.
        </div>
        <br />
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Темп начитки:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="slow"
              control={<Radio />}
              label="Медленно"
            />
            <FormControlLabel
              value="optimally"
              control={<Radio />}
              label="Оптимально"
            />
            <FormControlLabel value="fast" control={<Radio />} label="Быстро" />
          </RadioGroup>
        </FormControl>
        <br />
        <div>
          Хронометраж Вашего текста: <span id="time">{resalt}</span>
        </div>
        <p>
          Знаков: <span id="cnt">{signs}</span> / Слов:
          <span id="wrd">{words}</span>
        </p>
        <Stack direction="row" spacing={2}>
          <Button onClick={reset} variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button
            onClick={() => handleSubmit(text)}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Count
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default Form;
