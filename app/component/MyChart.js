import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
const screenWidth = Dimensions.get('window').width;



const MyChart = () => {

    const data = [
        { name: 'Product A', qty: 45, color: '#ff6347' }, 
        { name: 'Product B', qty: 55, color: '#4682b4' },  
        { name: 'Product c', qty: 55, color: '#7787b4' }
    ];

   
    const processedData = data.map(item => ({
        ...item,
        qty: isNaN(parseFloat(item.qty)) ? 0 : parseFloat(item.qty) 
    }));

   
    const totalQuantity = data.reduce((sum, product) => sum + product.qty, 0);

   
    const createPiePaths = (data) => {
        let accumulatedAngle = 0;
        const radius = 100; 
        const centerX = 150; 
        const centerY = 150;

        return data.map((item, index) => {
            const sliceAngle = (item.qty / totalQuantity) * 360;
            const startAngle = accumulatedAngle;
            const endAngle = accumulatedAngle + sliceAngle;

            const startX = centerX + radius * Math.cos((Math.PI / 180) * startAngle);
            const startY = centerY + radius * Math.sin((Math.PI / 180) * startAngle);
            const endX = centerX + radius * Math.cos((Math.PI / 180) * endAngle);
            const endY = centerY + radius * Math.sin((Math.PI / 180) * endAngle);

            const largeArcFlag = sliceAngle > 180 ? 1 : 0;

            const pathData = `
          M ${centerX} ${centerY}
          L ${startX} ${startY}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `;

            accumulatedAngle += sliceAngle;

            return { pathData, color: item.color };
        });
    };
    const paths = createPiePaths(data);

    return (
        <View style={{ alignItems: 'center', marginBottom:50 }}>
            <Svg width={300} height={300}>
                <G x={0} y={0}>
                    {paths.map((path, index) => (
                        <Path key={index} d={path.pathData} fill={path.color} />
                    ))}
                </G>
            </Svg>
            {data.map((item, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: item.color, marginRight: 8 }} />
                    <Text>{item.name}: {item.qty}</Text>
                </View>
            ))}
        </View>
    );
};

export default MyChart;
