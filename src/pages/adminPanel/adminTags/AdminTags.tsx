import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "hooks";
import {selectTags} from "store/selectors";
import {deleteTags, getTags} from "store/actions";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider, Grid,
  List,
  ListItem,
  ListItemIcon, ListItemText, useMediaQuery
} from "@mui/material";
import {Loader} from "common";
import {FormattedMessage} from "react-intl";

export const AdminTags = () => {
  const dispatch = useAppDispatch();

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  const tags = useAppSelector(selectTags);

  const [checked, setChecked] = useState<string[]>([]);
  const [left, setLeft] = useState<string[]>(tags);
  const [right, setRight] = useState<string[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const numberOfChecked = (items: string[]) =>
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

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleDeleteTags = () => {
    dispatch(deleteTags(right))

    setRight([]);
  }


  const customList = (title: React.ReactNode, items: string[]) => (
    <Card>
      <CardHeader
        sx={{px: 2, py: 1}}
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
      <Divider/>
      <List
        sx={{
          width: 350,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: string) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
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
              <ListItemText id={labelId} primary={value}/>
            </ListItem>
          );
        })}
        <ListItem/>
      </List>
    </Card>
  );


  useEffect(() => {
    dispatch(getTags());
  }, [])

  useEffect(() => {
    setLeft(tags)
  }, [tags])

  return (
    <>
      {tags.length !== 0
        ? (
          <>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              direction={isSmallScreen ? 'column': 'row'}
            >

              <Grid item>
                {customList(<FormattedMessage id='app.admin.tags.choices.title'/>, left)}
              </Grid>

              <Grid item>
                <Grid container direction={isSmallScreen ? 'row' : 'column'} alignItems="center">
                  <Button
                    sx={{my: '15px', transform: `rotate(${isSmallScreen ? '90deg' : '0'})`}}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{my: '15px', transform: `rotate(${isSmallScreen ? '90deg' : '0'})`}}
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

              <Grid item>
                {customList(<FormattedMessage id='app.admin.tags.chosen.title'/>, right)}
              </Grid>

            </Grid>

            <Box  sx={{textAlign: 'center', marginY: '50px'}}>

              <Button
                variant={"contained"}
                color={'error'}
                onClick={handleDeleteTags}
              >
                <FormattedMessage id='app.admin.tags.button-delete.title'/>
              </Button>

            </Box>
          </>
        )

        : <Loader/>
      }
    </>
  );
};


function not(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: string[], b: string[]) {
  return [...a, ...not(b, a)];
}