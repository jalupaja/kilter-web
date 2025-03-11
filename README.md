relevant queries:
```SQL
-- placement id to led id map (original 12x12 with kickboard)
select
    placements.id,
    leds.position
from
    placements
    inner join leds on placements.hole_id = leds.hole_id
where
    placements.layout_id = 1
    and leds.product_size_id = 10;

-- get 50 most popular boulders over 22(7a)
select distinct
    climbs.name,
    climb_stats.angle,
    climb_stats.difficulty_average,
    difficulty_grades.boulder_name,
    climbs.frames
from
    climbs
    join climb_stats on climbs.uuid = climb_stats.climb_uuid
    join difficulty_grades on round(climb_stats.difficulty_average) = difficulty_grades.difficulty
where
    frames_count = 1
    and difficulty_average > 22
order by
    climb_stats.ascensionist_count desc
limit
    50;
```
