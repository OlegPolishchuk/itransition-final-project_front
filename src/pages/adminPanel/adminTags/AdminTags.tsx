import React, { ReactElement, useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@mui/material';

import { Loader } from 'common';
import { useAppDispatch, useAppSelector } from 'hooks';
import { formatMessage } from 'shared';
import { deleteTags, getTags } from 'store/actions';
import { selectTags } from 'store/selectors';

const localeMessage = formatMessage('admin.tags');

export const AdminTags = (): ReactElement => {
  const dispatch = useAppDispatch();

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const tags = useAppSelector(selectTags);

  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<string[]>(tags);
  const [right, setRight] = useState<string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items: string[]): number =>
    intersection(checked, items).length;

  const handleToggleAll = (items: string[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedRight = (): void => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = (): void => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleDeleteTags = (): void => {
    dispatch(deleteTags(right));

    setRight([]);
  };

  const customList = (title: React.ReactNode, items: string[]): ReactElement => (
    <Card>
      <CardHeader
        sx={style.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List sx={style.list} dense component="div" role="list">
        {items.map((value: string) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  useEffect(() => {
    dispatch(getTags());
  }, []);

  useEffect(() => {
    setLeft(tags);
  }, [tags]);

  return (
    <div>
      {tags.length !== 0 ? (
        <>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            direction={isSmallScreen ? 'column' : 'row'}
          >
            <Grid item>{customList(localeMessage('choices'), left)}</Grid>

            <Grid item>
              <Grid
                container
                direction={isSmallScreen ? 'row' : 'column'}
                alignItems="center"
              >
                <Button
                  sx={style.switcher(isSmallScreen)}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  sx={style.switcher(isSmallScreen)}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
              </Grid>
            </Grid>

            <Grid item>{customList(localeMessage('chosen'), right)}</Grid>
          </Grid>

          <Box sx={style.buttonsWrapper}>
            <Button variant="contained" color="error" onClick={handleDeleteTags}>
              {localeMessage('button-delete')}
            </Button>
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

function not(a: string[], b: string[]): string[] {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]): string[] {
  return a.filter(value => b.indexOf(value) !== -1);
}

function union(a: string[], b: string[]): string[] {
  return [...a, ...not(b, a)];
}

const style = {
  cardHeader: { px: 2, py: 1 },

  list: {
    width: 350,
    height: 230,
    bgcolor: 'background.paper',
    overflow: 'auto',
  },

  switcher: (isSmallScreen: boolean) => ({
    my: '15px',
    transform: `rotate(${isSmallScreen ? '90deg' : '0'})`,
  }),

  buttonsWrapper: { textAlign: 'center', marginY: '50px' },
};
