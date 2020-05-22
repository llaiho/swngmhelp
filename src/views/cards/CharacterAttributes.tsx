import React, { FC } from "react";
import CharacterCardProps from "./CharacterCardProps";
import { Card, Grid } from "@material-ui/core";
import AttributeContainer from "../../components/AttributeContainer";
import useCardStyles from "./useCardStyle";
import EditableNumber from "../../components/EditableNumber";
import { getAttributeBonus } from "../../utils/characterUtils";

const CharacterAttributes: FC<CharacterCardProps> = (props: CharacterCardProps) => {
    const classes = useCardStyles();

    function editAttributes(name: string, value: number) {

        props.setCharacter(prev => {
            if(prev) {
                return {...prev, attributes: {...prev.attributes, [name]: value}};
            }
            return prev;
            
        })
    }

    const { character } = props;

    const attrs: [string, string, number][] = [
        ["Strength", "str", character.attributes.str],
        ["Dexterity", "dex", character.attributes.dex],
        ["Constitution", "con", character.attributes.con],
        ["Intelligence", "int", character.attributes.int],
        ["Wisdom", "wis", character.attributes.wis],
        ["Charisma", "cha", character.attributes.cha],
    ];

    return (
        <Card classes={{ root: classes.card }}>
            <Grid container alignItems="center" justify="space-around">
                {attrs.map((attr: [string, string, number]) => {
                    const bonus = getAttributeBonus(attr[2]);
                    const bonusStr = bonus >= 0 ? `+${bonus}` : String(bonus);
                    
                    const bonusElem = bonus !== 0 ? <small className={bonus > 0 ? classes.positiveText: classes.negativeText}> {bonusStr}</small> : undefined;

                    return (
                        <Grid item xs={2} classes={{ root: classes.centerItem }} key={attr[1]}>
                            <h3>{attr[0]}</h3>
                            <h3>
                                <EditableNumber
                                    name={attr[1]}
                                    value={attr[2]}
                                    onEdit={editAttributes}
                                    min={3}
                                    max={18}
                                    postFix={bonusElem}
                                    
                                    
                                />
                            </h3>
                        </Grid>
                    );
                })}
                
            </Grid>
        </Card>
    );
};

export default CharacterAttributes;
