import { NextResponse } from 'next/server';

export async function GET() {
    // នៅក្នុងគម្រោងពិតប្រាកដ (Real project) ទិន្នន័យនេះនឹងត្រូវទាញយកពី Supabase Database
    // ឧទាហរណ៍៖ const { data, error } = await supabase.from('earthwork_daily_logs').select('*');
    
    const stats = {
        totalExcavation: 12450,
        totalEmbankment: 8600,
        inspectionsPassed: 24,
        inspectionsFailed: 2,
        fuelEfficiency: 1.15,
    };

    const earthworkProgress = [
        { date: '01 Nov', excavation: 1200, embankment: 850 },
        { date: '02 Nov', excavation: 1400, embankment: 900 },
        { date: '03 Nov', excavation: 1100, embankment: 800 },
        { date: '04 Nov', excavation: 1500, embankment: 1000 },
        { date: '05 Nov', excavation: 1300, embankment: 950 },
        { date: '06 Nov', excavation: 1600, embankment: 1100 },
        { date: '07 Nov', excavation: 1000, embankment: 750 },
    ];

    const recentInspections = [
        { id: 'INS-081', element: 'Weir Foundation', date: '2023-11-07', status: 'Passed', inspector: 'សុខ ហេង' },
        { id: 'INS-080', element: 'Abutment Left', date: '2023-11-06', status: 'Failed', inspector: 'វីរៈ' },
        { id: 'INS-079', element: 'Bridge Beam', date: '2023-11-06', status: 'Passed', inspector: 'សុខ ហេង' },
        { id: 'INS-078', element: 'Slab Base', date: '2023-11-05', status: 'Passed', inspector: 'សុខ ហេង' },
    ];

    return NextResponse.json({ stats, earthworkProgress, recentInspections });
}
